using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class MGRoadtoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/MGRoadtoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Airport To MGRoad | we offer Rs 474/- 4.00am to 7.45am | up to 4 passengers ";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to MGRoad Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "MGRoad To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "Get Taxi Online. U taxi provides 24 Hour Taxi Cab Service in all over Bengaluru city. Arrive to your destination on time with the help of our convenient service.";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "MGRoad to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "Book airport cabs in U taxi cab service from Kempegowda International Airport starting at just Rs 599/-. Choose from the wide range of cars with our airport taxi booking in Bengaluru.";

            return View();
        }
    }
}