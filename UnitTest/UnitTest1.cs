using Application.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Repository;
using System.Threading.Tasks;
using Test.Controllers;
using Teste.Controllers;

namespace UnitTest
{
    [TestClass]
    public class UnitTest1
    {

        private static User RetornarUsuarioTest()
        {
            return new User()
            {
                Id = 1,
                Login = "Teste1",
                Name = "Teste",
                Password = "123456"
            };
        }

        [TestMethod]
        public void LoginAsync()
        {
            Moq.Mock<UserRepository> mock = new Moq.Mock<UserRepository>((object)null);
            mock.Setup(m => m.Login("Teste1", "123456")).Returns(Task.FromResult(UnitTest1.RetornarUsuarioTest()));

            var _loginController = new LoginController(mock.Object);

            Login login = new Login();
            login.NameLogin = "Teste1";
            login.Password = "123456";

            Microsoft.AspNetCore.Mvc.ActionResult<dynamic> loged = Task.Run(async () =>
            {
                return await _loginController.Login(login);
            }).GetAwaiter().GetResult();

            var ok = (Microsoft.AspNetCore.Mvc.OkObjectResult)loged.Result;

            Assert.AreNotEqual(null, ok.Value);
        }


        [TestMethod]
        public void CreateUser()
        {
            Moq.Mock<UserRepository> mock = new Moq.Mock<UserRepository>((object)null);
            
            User use = new User();
            use.Name = "Teste1";
            use.Login = "teste";
            use.Password = "123456";

            mock.Setup(m => m.Add(use)).Returns(Task.FromResult(use));

            var _userController = new UserController(mock.Object);

            Microsoft.AspNetCore.Mvc.ActionResult<User> result = Task.Run(async () =>
            {
                return await _userController.Create(use);
            }).GetAwaiter().GetResult();

            var ok = (Microsoft.AspNetCore.Mvc.OkObjectResult)result.Result;

            Assert.AreNotEqual(null, ok.Value);
        }
    }
}
