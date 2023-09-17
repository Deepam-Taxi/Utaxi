using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class RajajinagartoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/RajajinagartoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Airport To Rajajinagar Rs 474/- No Toll up to 4 passengers";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Rajajinagar Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Rajajinagar To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "We have the most experienced staff in the field of Airport Taxi Service since 14 years. Book Taxi from Airport to anywhere in Bangalore upto 45Km from 3am to 7am  at just Rs.599.Sedan Just Rs899. Hatchback Just Rs799. SUV Just Rs1599/-.";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Rajajinagar to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "Book Taxi from Airport to anywhere in Bengaluru at just Rs.499/-, Call - 080 414 66 888. Airport Taxi in Bengaluru, Airport Cabs Bangalore, Airport Taxi Service";

            return View();
        }
    }
}