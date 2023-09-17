using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class WhitefieldtoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/WhitefieldtoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Cab for Airport To Whitefield  Rs 474/- up to 4 passengers";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Whitefield Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Whitefield To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "Whether you're traveling for business or pleasure, use U taxi cab service for convenient rides to airport and from the airport to Bengaluru. Now serving over all over the Bengaluru. ";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Whitefield to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "Book airport cabs with Utaxi. Enjoy hassle-free pick-ups & drops with our airport taxi";

            return View();
        }
    }
}