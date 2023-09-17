using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestholidaypackage
{
    public class cheapestholidaypackageAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "cheapestholidaypackage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "cheapestholidaypackage_default",
                "cheapestholidaypackage/weekendgetaway/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}