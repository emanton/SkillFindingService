using Services.Interfaces;
using Services.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SkillsFindingService.Controllers
{
    //[Authorize]
    [RoutePrefix("User")]
    public class UserController : BaseApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("Registration")]
        public async Task<int> Registration(UserSimpleRegistrationData userData)
        {            
            return await _userService.RegistrationAsync(userData);
        }

        [HttpGet]
        [Authorize]
        [Route("GetUserData")]
        public async Task<UserData> GetUserData() {
            return await _userService.GetUserData(CurrentUserId);
        }

        [HttpGet]
        [Route("GetUserData/{userId}")]
        public async Task<UserData> GetUserData(int userId)
        {
            return await _userService.GetUserData(userId);
        }

        [HttpPut]
        [Authorize]
        [Route("UpdateUserData")]
        public async Task<UserData> UpdateUserData(UserData userData)
        {
            return await _userService.UpdateUserData(userData);
        }

        [HttpPut]
        [Authorize]
        [Route("UpdateUserSettings")]
        public async Task<bool> UpdateUserSettings(UserSettings userData)
        {
            return await _userService.UpdateUserSettings(userData);
        }

        [HttpGet]
        [Route("GetAllSearchRequests")]
        public async Task<ICollection<SearchRequestDto>> GetAllSearchRequests()
        {
            return await _userService.GetAllSearchRequests();
        }
   
        [HttpGet]
        [Route("Search/{searchString}")]
        public async Task<ICollection<UserSearchResult>> Search(string searchString)
        {
            return await _userService.UserSearchAsync(searchString);
        }

        [HttpGet]
        [Route("UserAllUsersAsync")]
        public async Task<ICollection<UserSearchResult>> Get()
        {
            var users = await _userService.GetAllUsersAsync();
            return users;
        }

        [HttpGet]
        [Route("GetCommentsByUserId/{userId}")]
        public async Task<ICollection<CommentDto>> GetCommentsByUserId(long userId)
        {
            return await _userService.GetCommentsByUserId(userId);
        }

        [HttpPost]
        [Authorize]
        [Route("SendComment")]
        public async Task<int> SendComment(CommentData commentData)
        {
            return await _userService.SendComment(commentData);
        }

        [HttpGet]
        [Route("DeleteCommentById/{commentId}")]
        public async Task<int> DeleteCommentById(long commentId)
        {
            return await _userService.DeleteCommentById(commentId);
        }
    }
}
