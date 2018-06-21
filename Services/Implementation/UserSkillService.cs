using AutoMapper;
using Core.Data;
using Core.Data.Repositories;
using Core.Entities;
using Services.Interfaces;
using Services.Model.User;
using Services.Model.UserSkill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            //using (var transaction = _unitOfWork.BeginTransaction())
            //{
            
            try
            {
                //_unitOfWork.BeginTransaction();
                var user = await _userRepository.GetSingleAsync(userSkill.UserId);
                var skill = await _skillRepository.GetSingleAsync(userSkill.SkillId);
                user.Skills.Add(skill);
                await _unitOfWork.SaveChangesAsync();
                return (int) skill.Id;
            }
            catch (Exception ex)
            {
                return -1;
                // return await _unitOfWork.SaveChangesAsync();
                // transaction.Rollback();
            }
            //}
        }

        public async Task<int> DeleteUserSkill(UserSkill userSkill)
        {
            try
            {
                //_unitOfWork.BeginTransaction();
                var user = await _userRepository.GetSingleAsync(userSkill.UserId);
                var skill = await _skillRepository.GetSingleAsync(userSkill.SkillId);
                user.Skills.Remove(skill);
                //var asd = await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.SaveChangesAsync();
                return (int)skill.Id;
            }
            catch (Exception ex)
            {
                return -1;
                // return await _unitOfWork.SaveChangesAsync();
                // transaction.Rollback();
            }
        }

        public async Task<ICollection<SkillDto>> GetUserSkills(int userId)
        {
            var user = await _userRepository.GetSingleAsync(userId);
            return Mapper.Map<List<SkillDto>>(user.Skills);
        }
    }
}
