using System.Threading.Tasks;
using GoUpLadder.API.Helpers;
using GoUpLadder.API.Models;

namespace GoUpLadder.API.Data
{
    public interface IUpLadderRepository
    {
         
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);

    }
}