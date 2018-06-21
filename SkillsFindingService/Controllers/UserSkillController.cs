using Services.Interfaces;
using Services.Model.User;
using Services.Model.UserSkill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SkillsFindingService.Controllers
{
    //[Authorize]
    [RoutePrefix("UserSkill")]
    public class UserSkillController : ApiController
    {
        private readonly IUserSkillService _userSkillService;

        public UserSkillController(IUserSkillService userSkillService)
        {
            _userSkillService = userSkillService;
        }

        [HttpGet]
        [Route("GetUserSkills")]
        public async Task<ICollection<SkillDto>> GetUserSkills(int id)
        {            
            return await _userSkillService.GetUserSkills(id);
        }

        [HttpPost]
        [Route("AddUserSkill")]
        public async Task<int> AddUserSkill(UserSkill userSkill)
        {
            return await _userSkillService.AddUserSkill(userSkill);
        }

        [HttpDelete]
        [Route("RemoveUserSkill/{userId}/{skillId}")]
        public async Task<int> RemoveUserSkill(int userId, int skillId) {
            UserSkill userSkill = new UserSkill()
            {
                SkillId = skillId,
                UserId = userId
            };

            return await _userSkillService.DeleteUserSkill(userSkill);
        }
    }
}
