using Application.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using Test.Controllers;
using Teste.Controllers;

namespace UnitTest
{
    [TestClass]
    public class UnitTest1
    {
        private readonly LoginController _loginController;
        private readonly UserController _userController;
        public UnitTest1(LoginController controller, UserController userController)
        {
            _loginController = controller;
        }
        [TestMethod]
        public async Task LoginAsync()
        {
            Login login = new Login();
            login.NameLogin = "Teste1";
            login.Password = "123456";


           var loged = await _loginController.Login(login);
            Assert.AreEqual(null, loged);
        }


        [TestMethod]
        public async Task CreateUser()
        {
            User use = new User();
            use.Name = "Teste1";
            use.Login = "teste";
            use.Password = "123456";


            var ceateUser = await _userController.Create(use);
            Assert.AreEqual(true, ceateUser);
        }
    }
}
