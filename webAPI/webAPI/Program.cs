using webAPI.Repositories;
using webAPI.Settings;
using System.Configuration;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson;
using System.Net.Mime;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers(
    options => {
        options.SuppressAsyncSuffixInActionNames = false;
    }
);

var mongoDbSettings = builder.Configuration.GetSection(nameof(MongoDbSettings)).Get<MongoDbSettings>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks()
    .AddMongoDb(mongoDbSettings.ConnectionString,
     name: "mongodb",
      timeout: TimeSpan.FromSeconds(3),
      tags: new[] {"ready"}
      );

BsonSerializer.RegisterSerializer(new GuidSerializer(BsonType.String));
BsonSerializer.RegisterSerializer(new DateTimeOffsetSerializer(BsonType.String));

builder.Services.AddSingleton<IItemsRepository, MongoDBItemsRepository>();
builder.Services.AddSingleton<IEmployeeRepository, MongoDBEmployeeRepository>();
builder.Services.AddSingleton<ICategoryRepository, MongoDBCategoryRepository>();
 
builder.Services.AddSingleton<IMongoClient>(serviceProvider => 
{
    return new MongoClient(mongoDbSettings.ConnectionString);
});

builder.Services.AddCors(option => {
    option.AddDefaultPolicy(builder=> {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    
}

if(app.Environment.IsDevelopment()){
app.UseHttpsRedirection();
}

app.UseCors();
app.UseAuthorization();

app.MapControllers();

//Recieve queries
app.MapHealthChecks("/health/ready", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions{
    Predicate = (check) => check.Tags.Contains("ready"),
    ResponseWriter = async(context, report) =>{
        var result = JsonSerializer.Serialize(
            new{
                status = report.Status.ToString(),
                checks = report.Entries.Select(entry => new{
                    name = entry.Key,
                    status = entry.Value.Status.ToString(),
                    exception = entry.Value.Exception != null ? entry.Value.Exception.Message : null,
                    duration = entry.Value.Duration.ToString()
                })
            }
        );
        context.Response.ContentType = MediaTypeNames.Application.Json;
        await context.Response.WriteAsync(result);
    }
});

//Up n Running
app.MapHealthChecks("/health/live", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions{
    Predicate = (_) => false
});


app.Run();
