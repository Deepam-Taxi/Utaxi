using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class PeenyatoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/PeenyatoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Airport To Peenya | we offer Rs 474/- 4.00am to 7.45am | up to 4 passengers ";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Peenya Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Peenya To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "Offline pin Karnataka  U taxi Cab service . Authorized City Taxi Service. Assignment turned in We Provide Airport Vehicle Services (4 Seat) only for Airport. GPS";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Peenya to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "Safe & Secure along with trusted U taxi Cabs, Airport taxi Pickup and Drop Services. Book your Bengaluru Airport taxi Or Outstation Cabs have Wonderful Travel. 08042247272. Types: Safe and secured Taxi, In-time pickup & drop.";

            return View();
        }
    }
}