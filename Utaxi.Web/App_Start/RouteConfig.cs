using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Utaxi.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Package",
                url: "PackageDetails/{Packagename}",
                defaults: new { controller = "Package", action = "PackageDetails", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "bestprice",
                url: "cheapestoutstationcabservice/{Cityname}",
                defaults: new { controller = "bestprice", action = "cheapestoutstationcabservice", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Offers",
                url: "Offers/{Offername}",
                defaults: new { controller = "Offers", action = "OfferDetails", id = UrlParameter.Optional }
            );
        }
    }
}
