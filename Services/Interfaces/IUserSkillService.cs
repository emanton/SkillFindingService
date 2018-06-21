using Services.Model.User;
using Services.Model.UserSkill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IUserSkillService {
        Task<int> AddUserSkill(UserSkill userSkill);
        Task<int> DeleteUserSkill(UserSkill userSkill);
        Task<ICollection<SkillDto>> GetUserSkills(int userId);
    }
}