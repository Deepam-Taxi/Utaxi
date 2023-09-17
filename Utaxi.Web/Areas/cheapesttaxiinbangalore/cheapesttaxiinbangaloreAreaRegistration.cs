using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore
{
    public class cheapesttaxiinbangaloreAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "cheapesttaxiinbangalore";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "cheapesttaxiinbangalore_default",
                "cheapesttaxiinbangalore/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}