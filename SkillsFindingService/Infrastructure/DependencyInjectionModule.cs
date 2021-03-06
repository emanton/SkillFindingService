﻿using Autofac;
using Data;
using Services.Implementation;
using System.Web;

namespace SkillsFindingService.Infrastructure
{
    public class DependencyInjectionModule : Module
    {
        /// <summary>
		/// Loads the specified builder.
		/// </summary>
		/// <param name="builder">The builder.</param>
		protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<AppDbContext>().AsSelf().AsImplementedInterfaces().InstancePerRequest();
            builder.RegisterType<UnitOfWork>().AsImplementedInterfaces().InstancePerRequest();
            builder.RegisterType<UserService>().AsImplementedInterfaces().InstancePerRequest();
            builder.RegisterType<UserSkillService>().AsImplementedInterfaces().InstancePerRequest();
            builder.RegisterType<SkillService>().AsImplementedInterfaces().InstancePerRequest();
            builder.Register(b => HttpContext.Current.GetOwinContext().Authentication).InstancePerRequest();
        }
    }

        
}