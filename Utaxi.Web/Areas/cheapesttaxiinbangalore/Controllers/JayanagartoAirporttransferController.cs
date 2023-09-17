using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class JayanagartoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/JayanagartoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Airport To Jayanagar  we offer @ Rs 474/- up to 4 passengers";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Jayanagar Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Jayanagar To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "Bengaluru trusted Cab Services is U taxi rental cab services for Airport drop, Outstation A/c & Non A/c cab services. Easy online booking from U taxi cab service in Devanahalli Bengaluru for lowest fares, and cheapest intercity rides.";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Jayanagar to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "BengaluruTaxi. U taxi cab service in Bengaluru is the official taxi operators from Kempegowda International Airport to Bengaluru. We provide you Safe and Convenient Taxi Operations in Bengaluru";

            return View();
        }
    }
}