using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Utaxi.Web.Startup))]
namespace Utaxi.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
