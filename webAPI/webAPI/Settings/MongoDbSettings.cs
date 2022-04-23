namespace webAPI.Settings
{
    public class MongoDbSettings
    {
        public string Host {get; set;}=default!;

        public int Port {get; set;}

        public string User {get; set;}=default!;
        public string Password {get; set;}=default!;

        public string ConnectionString {
            get{
                return $"mongodb://{User}:{Password}@{Host}:{Port}";
        }
        }
    }
}