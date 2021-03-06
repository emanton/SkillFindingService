﻿using Core.Data;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class AppDbContext : DbContext, IContext
    {
        private ObjectContext _objectContext;
        private DbTransaction _transaction;
        private static readonly object _lock = new object();
        private static bool _databaseInitialized;

        public AppDbContext() : base("name=SkillsFindingServiceDatabase")
        {
            if (_databaseInitialized)
            {
                return;
            }
            lock (_lock)
            {
                if (!_databaseInitialized)
                {
                    _databaseInitialized = true;
                }
            }
        }

        //public virtual DbSet<News> News { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<SearchRequest> SearchRequest { get; set; }
        public virtual DbSet<Skill> Skill { get; set; }
        //public virtual DbSet<UserSkill> UserSkill { get; set; }

        public new IDbSet<TEntity> Set<TEntity>() where TEntity : class, IBaseEntity
        {
            return base.Set<TEntity>();
        }

        public void SetAsAdded<TEntity>(TEntity entity) where TEntity : class, IBaseEntity
        {
            UpdateEntityState(entity, EntityState.Added);
        }

        public void SetAsModified<TEntity>(TEntity entity) where TEntity : class, IBaseEntity
        {
            UpdateEntityState(entity, EntityState.Modified);
        }

        public void SetAsDeleted<TEntity>(TEntity entity) where TEntity : class, IBaseEntity
        {
            UpdateEntityState(entity, EntityState.Deleted);
        }

        public DbTransaction BeginTransaction()
        {
            _objectContext = ((IObjectContextAdapter)this).ObjectContext;
            if (_objectContext.Connection.State == ConnectionState.Open)
            {
                return null;
            }
            _objectContext.Connection.Open();
            return _transaction = _objectContext.Connection.BeginTransaction();
        }

        public int Commit()
        {
            var saveChanges = SaveChanges();
            _transaction.Commit();
            return saveChanges;
        }

        public void Rollback()
        {
            _transaction.Rollback();
        }

        public Task<int> CommitAsync()
        {
            var saveChangesAsync = SaveChangesAsync();
            _transaction.Commit();

            return saveChangesAsync;
        }

        private void UpdateEntityState<TEntity>(TEntity entity, EntityState entityState) where TEntity : class, IBaseEntity
        {
            var dbEntityEntry = GetDbEntityEntrySafely(entity);
            dbEntityEntry.State = entityState;
        }

        private DbEntityEntry GetDbEntityEntrySafely<TEntity>(TEntity entity) where TEntity : class, IBaseEntity
        {
            var dbEntityEntry = Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                Set<TEntity>().Attach(entity);
            }

            return dbEntityEntry;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_objectContext != null && _objectContext.Connection.State == ConnectionState.Open)
                {
                    _objectContext.Connection.Close();
                }
                _objectContext?.Dispose();
                _transaction?.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
