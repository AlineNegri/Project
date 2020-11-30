using Application.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Repository;

namespace TestUnit
{
    [TestClass]
    public class UnitTest1
    {

        [TestMethod]
        public void TestAuthenticate()
        {
            User user = new User();
            user.Name = "Teste";
            user.Password = "123456";
            user.Login = "Teste1";

            //bool returnUser = new UserRepository
        }
    }
}
