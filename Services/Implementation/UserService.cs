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
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Skill> _skillRepository;
        private readonly IRepository<Comment> _commentRepository;
        private readonly IRepository<SearchRequest> _searchRepository;
        
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _userRepository = unitOfWork.Repository<User>();
            _skillRepository = unitOfWork.Repository<Skill>();
            _commentRepository = unitOfWork.Repository<Comment>();
        }

        public async Task<ICollection<UserSearchResult>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return Mapper.Map<List<UserSearchResult>>(users);
        }

        public async Task<ICollection<SearchRequestDto>> GetAllSearchRequests()
        {
            var searchRequests = await _searchRepository.GetAllAsync();
            return Mapper.Map<List<SearchRequestDto>>(searchRequests.ToList<SearchRequest>());
        }

        public async Task<ICollection<UserSearchResult>> UserSearchAsync(string searchString)
        {
            // create search string
            // use search system elastic search
            var users = await _userRepository.GetAllAsync();
            var skills = await _skillRepository.GetAllAsync();
            var matchedSkills = from s in skills where s.Name.ToLower().Contains(searchString.ToLower()) select s;
            var resultUsers = from u in users where u.Skills.Contains(matchedSkills.FirstOrDefault()) select u;
            return Mapper.Map<List<UserSearchResult>>(resultUsers.ToList<User>());
        }

        public async Task<UserData> GetUserData(int userId)
        {
            User user = await _userRepository.GetSingleAsync(userId);
            return Mapper.Map<UserData>(user);
        }

        public async Task<UserData> GetUserData(string login, string password)
        {
            User resultUser = (await _userRepository.FindByAsync(x => x.Email == login && x.Password == password)).FirstOrDefault();
            return Mapper.Map<UserData>(resultUser);
        }

        public async Task<UserData> UpdateUserData(UserData userData)
        {
            User user = await _userRepository.GetSingleAsync(userData.Id);
            User updatedData = Mapper.Map<UserData, User>(userData, user);
            _userRepository.Update(updatedData);
            await _unitOfWork.SaveChangesAsync();
            //return await _unitOfWork.SaveChangesAsync();

            User updatedUser = await _userRepository.GetSingleAsync(userData.Id);  //redo
            return Mapper.Map<UserData>(updatedUser);
        }

        public async Task<bool> UpdateUserSettings(UserSettings userSettings)
        {
            User user = await _userRepository.GetSingleAsync(userSettings.Id);
            if(userSettings.OldPassword == user.Password)
            {
                User updatedData = Mapper.Map<UserSettings, User>(userSettings, user);
                _userRepository.Update(updatedData);
                int updatesCount = await _unitOfWork.SaveChangesAsync();
                if(updatesCount > 0)
                {
                    return true;
                }
            }

            return false;
        }


        public async Task<ICollection<UserSearchResult>> UserSearchAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return Mapper.Map<List<UserSearchResult>>(users);
        }

        public async Task<int> RegistrationAsync(UserSimpleRegistrationData userData)
        {
            _userRepository.Insert(Mapper.Map<User>(userData));
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<int> SendComment(CommentData userData)
        {
            User userFrom = await _userRepository.GetSingleAsync(userData.UserFromId);
            User userTo = await _userRepository.GetSingleAsync(userData.UserToId);
            Comment comment = new Comment()
            {
                UserFrom = userFrom,
                Rate = userData.Rate,
                Text = userData.Text,
                date = DateTime.Now
            };

            _commentRepository.Insert(comment);
            userTo.Comments.Add(comment);
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<ICollection<CommentDto>> GetCommentsByUserId(long userId)
        {
            User user = await _userRepository.GetSingleAsync(userId);
            return Mapper.Map<List<CommentDto>>(user.Comments);
        }

        public async Task<int> DeleteCommentById(long commentId)
        {
            Comment comment = await _commentRepository.GetSingleAsync(commentId);
            _commentRepository.Delete(comment);
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}
