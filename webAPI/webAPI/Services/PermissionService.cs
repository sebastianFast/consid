
using webAPI.Entities;

namespace webAPI.Services
{
    public static class PermissionService
    {
        private static string GetUserLevel(Employee user)
        {
            if(user.IsCEO) {
                return "CEO";
            } else if (user.IsManager) {
                return "Manager";
            } else {
                return "Employee";
            }
        }
        private static readonly Dictionary<string, Dictionary<string, bool>> HandlePermissions = new Dictionary<string, Dictionary<string, bool>>
        {
            {"CEO", new Dictionary<string, bool> {{"CEO",true},{ "Manager", true}, {"Employee", false}}},
            {"Manager", new Dictionary<string, bool> {{"CEO",false},{ "Manager", true}, {"Employee", true}}},
            {"Employee", new Dictionary<string, bool> {{"CEO",false},{ "Manager", false}, {"Employee", false}}}
        };
        private static readonly Dictionary<string, Dictionary<string, bool>> DeletePermissions = new Dictionary<string, Dictionary<string, bool>>
        {
            {"CEO", new Dictionary<string, bool> {{"CEO",false},{ "Manager", true}, {"Employee", false}}},
            {"Manager", new Dictionary<string, bool> {{"CEO",false},{ "Manager", true}, {"Employee", true}}},
            {"Employee", new Dictionary<string, bool> {{"CEO",false},{ "Manager", false}, {"Employee", false}}}
        };
        public static bool CanManage(Employee user, Employee target)
        {
            return HandlePermissions[GetUserLevel(user)][GetUserLevel(target)];
        }

        public static bool CanDelete(Employee user, Employee target)
        {
            return DeletePermissions[GetUserLevel(user)][GetUserLevel(target)];
        }
    }
}