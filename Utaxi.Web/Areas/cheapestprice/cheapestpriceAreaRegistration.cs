using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapestprice
{
    public class cheapestpriceAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "cheapestprice";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "cheapestprice_default",
                "cheapestprice/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}