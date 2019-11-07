using AutoMapper;
using Core.Data;
using Core.Data.Repositories;
using Core.Entities;
using Services.Interfaces;
using Services.Model.User;
using Services.Model.UserSkill;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Implementation
{
    public class UserSkillService : IUserSkillService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Skill> _skillRepository;
        IUnitOfWork _unitOfWork;
        public UserSkillService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _userRepository = unitOfWork.Repository<User>();
            _skillRepository = unitOfWork.Repository<Skill>();
        }

        public async Task<int> AddUserSkill(UserSkill userSkill)
        {
			var user = await _userRepository.GetSingleAsync(userSkill.UserId);
			var skill = await _skillRepository.GetSingleAsync(userSkill.SkillId);
			user.Skills.Add(skill);
			await _unitOfWork.SaveChangesAsync();
			return (int)skill.Id;
        }

        public async Task<int> DeleteUserSkill(UserSkill userSkill)
        {
			var user = await _userRepository.GetSingleAsync(userSkill.UserId);
			var skill = await _skillRepository.GetSingleAsync(userSkill.SkillId);
			user.Skills.Remove(skill);
			await _unitOfWork.SaveChangesAsync();
			return (int)skill.Id;
		}

        public async Task<ICollection<SkillDto>> GetUserSkills(int userId)
        {
            var user = await _userRepository.GetSingleAsync(userId);
            return Mapper.Map<List<SkillDto>>(user.Skills);
        }
    }
}
