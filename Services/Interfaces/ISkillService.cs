using Services.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ISkillService
    {
        Task<int> CustomInit();
        Task<int> AddSkill(SkillDto skillData);
        Task<int> AddCategory(CategoryDto categoryData);
        Task<ICollection<SkillDto>> GetAllSkill();
        Task<ICollection<CategoryDto>> GetAllCategories();
    }
}
