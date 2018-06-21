using Data;
using Microsoft.Owin.Security.OAuth;
using Services.Implementation;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace SkillsFindingService.Infrastructure
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override Task AuthorizationEndpointResponse(OAuthAuthorizationEndpointResponseContext context)
        {
            return base.AuthorizationEndpointResponse(context);
        }

        public override Task AuthorizeEndpoint(OAuthAuthorizeEndpointContext context)
        {
            return base.AuthorizeEndpoint(context);
        }

        public override Task GrantAuthorizationCode(OAuthGrantAuthorizationCodeContext context)
        {
            return base.GrantAuthorizationCode(context);
        }

        public override Task GrantClientCredentials(OAuthGrantClientCredentialsContext context)
        {
            return base.GrantClientCredentials(context);
        }

        public override Task GrantCustomExtension(OAuthGrantCustomExtensionContext context)
        {
            return base.GrantCustomExtension(context);
        }

        public override Task GrantRefreshToken(OAuthGrantRefreshTokenContext context)
        {
            return base.GrantRefreshToken(context);
        }

        public override Task MatchEndpoint(OAuthMatchEndpointContext context)
        {
            return base.MatchEndpoint(context);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            return base.TokenEndpoint(context);
        }

        public override Task TokenEndpointResponse(OAuthTokenEndpointResponseContext context)
        {
            return base.TokenEndpointResponse(context);
        }

        public override Task ValidateAuthorizeRequest(OAuthValidateAuthorizeRequestContext context)
        {
            return base.ValidateAuthorizeRequest(context);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            return base.ValidateClientRedirectUri(context);
        }

        public override Task ValidateTokenRequest(OAuthValidateTokenRequestContext context)
        {
            return base.ValidateTokenRequest(context);
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userService = new UserService(new UnitOfWork(new AppDbContext()));
            var temp = await userService.GetAllUsersAsync();
            var user = await userService.GetUserData(context.UserName, context.Password);
            //string userName = EncodeEmail(context.UserName);
            //var user = await UserManager.FindAsync(userName, context.Password);
            //Services.Model.User.UserSearchResult user = new Services.Model.User.UserSearchResult { Firstname = "Anton", Lastname = "Em" };//REDO TODO FROM STATIC

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            //if (!user.IsActive)
            //{
            //    context.SetError("invalid_grant", "The user is not active.");
            //    return;
            //}
            var asd = user.Id.ToString();
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim(ClaimTypes.SerialNumber, user.Id.ToString()));
            identity.AddClaim(new Claim("Id", asd));
            identity.AddClaim(new Claim(ClaimTypes.Name, user.Lastname + user.Lastname));

            bool asd11 = context.Validated(identity);
        }

        // TODO: find best solution to allow login with email aliases
        //private string EncodeEmail(string email)
        //{
        //    string at = "@";
        //    var splited = email.Split(new[] { at }, StringSplitOptions.RemoveEmptyEntries);
        //    return String.Concat(HttpUtility.UrlEncode(splited[0]), at, splited[1]);
        //}
    }
}