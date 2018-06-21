using AutoMapper;
using Core.Data;
using Core.Data.Repositories;
using Core.Entities;
using Services.Interfaces;
using Services.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class SkillService : ISkillService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Skill> _skillRepository;
        private readonly IRepository<Category> _categoryRepository;

        public SkillService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork; 
            _categoryRepository = unitOfWork.Repository<Category>();
            _skillRepository = unitOfWork.Repository<Skill>();
        }

        public async Task<int> CustomInit()
        {
            Category cat1 = new Category()
            {
                Name = "Программирование",
                Description = "Все что связано с разработкой ПО"
            };

            Category cat2 = new Category()
            {
                Name = "Обучение",
                Description = "Все что связано с обучением"
            };

            Category cat3 = new Category()
            {
                Name = "Остальное",
                Description = "Все что связано с организацией мероприятий, встреч и т.д."
            };

            _categoryRepository.Insert(cat1);
            _categoryRepository.Insert(cat2);
            _categoryRepository.Insert(cat3);
            await _unitOfWork.SaveChangesAsync();
            var caters = await _categoryRepository.GetAllAsync();
            
            SkillDto skill1 = new SkillDto()
            {
                Name = "Разработка веб сайтов",
                Description = "Предоставление услуг по разработке сайтов",
                Category = caters[0]
            };

            SkillDto skill2 = new SkillDto()
            {
                Name = "Разработка десктоп приложений",
                Description = "Предоставление услуг по разработке десктопных приложений",
                Category = caters[1]
            };

            SkillDto skill3 = new SkillDto()
            {
                Name = "Консультация по .Net",
                Description = "Обучение основным принципам .Net",
                Category = caters[1]
            };

            SkillDto skill4 = new SkillDto()
            {
                Name = "Консультация по Java",
                Description = "Обучение основным принципам Java",
                Category = caters[2]
            };

            SkillDto skill5 = new SkillDto()
            {
                Name = "Организация мероприятий",
                Description = "Предоставление услуг по организации мероприятий",
                Category = caters[2]
            };

            _skillRepository.Insert(Mapper.Map<Skill>(skill1));
            _skillRepository.Insert(Mapper.Map<Skill>(skill2));
            _skillRepository.Insert(Mapper.Map<Skill>(skill3));
            _skillRepository.Insert(Mapper.Map<Skill>(skill4));
            _skillRepository.Insert(Mapper.Map<Skill>(skill5));
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> AddSkill(SkillDto skillData)
        {
            _skillRepository.Insert(Mapper.Map<Skill>(skillData));
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ICollection<SkillDto>> GetAllSkill()
        {
            var skills = await _skillRepository.GetAllAsync();
            return Mapper.Map<List<SkillDto>>(skills);
        }

        public async Task<int> AddCategory(CategoryDto categoryData)
        {
            _categoryRepository.Insert(Mapper.Map<Category>(categoryData));
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ICollection<CategoryDto>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return Mapper.Map<List<CategoryDto>>(categories);
        }
    }
}
