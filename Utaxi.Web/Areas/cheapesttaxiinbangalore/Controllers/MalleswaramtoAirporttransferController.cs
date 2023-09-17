using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class MalleswaramtoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/MalleswaramtoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Prepaid taxi at Bangalore International Airport @ Rs 474/-";
            ViewBag.Description = "U Taxi have plenty of Taxis in the Airport, 24 hours Don’t fall prey to unauthorized taxis calling you with cheaper fares. We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Bangalore Airport Cab Service Malleswaram to Airport Drop 674/-";
            ViewBag.Description = "never trust those cab which queue in the airport exit We provide 24 hours lowest & cheapest Taxi price  in Bangalore airport transfer and we charge Malleswaram To Airport Rs 674/-";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "24 hour Taxi  service Malleswaram to Airport Round trip Rs 1220/- All included Up to 4 passenger travel";
            ViewBag.Description = "Airport Taxi & cabs Bengaluru 24/7 service - On Time Pick Up and Drop. Airport taxi Flat Price no hidden charges from U taxi cab service. Contact us- 080 414 66 888.";

            return View();
        }
    }
}