using Services.Interfaces;
using Services.Model.User;
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
    [RoutePrefix("Skill")]
    public class SkillController : ApiController
    {
        private readonly ISkillService _skillService;

        public SkillController(ISkillService skillService)
        {
            _skillService = skillService;

        }
        [HttpGet]
        [Route("InitSkills")]
        public async Task<int> InitSkills()
        {
            return await _skillService.CustomInit();
        }

        [HttpGet]
        [Route("GetSkills")]
        public async Task<ICollection<SkillDto>> GetSkills()
        {
            return await _skillService.GetAllSkill();
        }

        [HttpGet]
        [Route("GetCategories")]
        public async Task<ICollection<CategoryDto>> GetCategories()
        {
            return await _skillService.GetAllCategories();
        }

        [HttpPost]
        [Route("AddSkill")]
        public async Task<int> AddSkill(SkillDto skillData)
        {            
            return await _skillService.AddSkill(skillData);
        }

        [HttpPost]
        [Route("AddCategory")]
        public async Task<int> AddCategory(CategoryDto categoryData)
        {
            return await _skillService.AddCategory(categoryData);
        }
    }
}