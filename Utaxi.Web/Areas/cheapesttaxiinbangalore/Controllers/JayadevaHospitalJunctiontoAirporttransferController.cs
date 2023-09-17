using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class JayadevaHospitalJunctiontoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/JayadevaHospitalJunctiontoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Book Taxi  from Jayadeva Hospital Junction to Airport Pickup Rs 474/-";
            ViewBag.Description = "Looking for Best and cheapest airport cabs from Jayadeva Hospital Junction to Bangalore Airport Taxi, We Offer A Good Rate For Taxi in The City for Airport Drop";
            ViewBag.Keywords = "airport transfer bangalore, airport pickup taxi bangalore, airport pickup bangalore, airport pickup bangalore offer, bangalore airport pickup offers, bangalore airport pickup, airport pickup taxi bangalore, airport pickup bangalore 500 rs, airport pickup taxi bangalore, cab for airport pickup in bangalore, airport pickup and drop bangalore, bangalore airport pickup taxi offers, city taxi bangalore airport pickup, airport pickup taxi, bangalore airport pickup taxi, airport pickup and drop Bangalore, bangalore airport pickup, airport pickup bangalore, airport pickup";
            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Cab Services in Bangalore from Jayadeva Hospital to Airport Drop Rs 674/- ";
            ViewBag.Description = "Looking for Best and cheapest airport cabs from Jayadeva Hospital Junction to Bangalore Airport Taxi, We Offer A Good Rate For Taxi in The City for Airport Pickup";
            ViewBag.Keywords = "bangalore airport transfer, airport drop taxi bangalore, airport drop bangalore, airport drop bangalore offer, bangalore airport drop offers, bangalore airport drop, airport drop taxi bangalore, airport drop bangalore 500 rs, airport drop taxi bangalore, cab for airport drop in bangalore, airport pickup and drop bangalore, bangalore airport drop taxi offers, city taxi bangalore airport drop, airport drop taxi, bangalore airport drop taxi, airport pickup and drop,  bangalore airport drop cab, bangalore airport drop flat rate, bangalore airport to Jayadeva Hospital, Jayadeva Hospital Junction to bangalore airport";
            return View();

        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Jayadeva Hospital Junction to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge";
            ViewBag.Description = "Book Taxi for Round Trip One Way from Jayadeva Hospital, Local & Outstation Cab Service in Bangalore. Get multiple car options withU Taxi like - Hatchback, Sedan & SUV";
            ViewBag.Keywords = "airport taxi bangalore, airport taxi bangalore offer, bangalore airport taxi round trip, airport round trip cabs bangalore, airport round trip bangalore";
            return View();

        }
    }
}