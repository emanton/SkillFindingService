using Services.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IUserService
    {
        
        Task<ICollection<UserSearchResult>> GetAllUsersAsync();
        Task<ICollection<SearchRequestDto>> GetAllSearchRequests();
        Task<ICollection<UserSearchResult>> UserSearchAsync(string searchString);
        Task<int> RegistrationAsync(UserSimpleRegistrationData userData);
        Task<UserData> GetUserData(int userId);
        Task<UserData> GetUserData(string login, string password);
        Task<UserData> UpdateUserData(UserData userData);
        Task<bool> UpdateUserSettings(UserSettings userData);
        Task<ICollection<CommentDto>> GetCommentsByUserId(long userId);
        Task<int> SendComment(CommentData userData);
        Task<int> DeleteCommentById(long id);
        
        //Task<NewsResponseModel> InsertAsync(NewsCreateModel model, long creatorId);
        //Task<NewsResponseModel> UpdateNewsAsync(NewsUpdateModel model, long id);
        //Task DeleteAsync(long id, long creatorId);
    }
}
