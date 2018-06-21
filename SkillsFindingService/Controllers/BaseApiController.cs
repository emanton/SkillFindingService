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
    public class BaseApiController : ApiController
    {
        protected int CurrentUserId
        {
            get
            {
                var claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
                var userIdClaim = claimsIdentity?.FindFirst(x => x.Type.Equals(ClaimTypes.SerialNumber));

                if (!string.IsNullOrEmpty(userIdClaim?.Value))
                {
                    int userId;
                    if (int.TryParse(userIdClaim.Value, out userId))
                        return userId;
                }

                throw new Exception("User id is not available");
            }
        }
    }
}