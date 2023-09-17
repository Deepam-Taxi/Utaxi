using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class BanaswaditoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/BanaswaditoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Book Cabs in Bangalore from Airport to Banaswadi Rs 674/-";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Banaswadi Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Book Cab Service in Bangalore Banaswadi to Airport 674/-";
            ViewBag.Description = "Compare to Meru Cabs is India's largest radio taxi service Bmtc and Vayu Vajra Services fares and costlier than our Taxi services of Rs-674/- for 4 people U Taxi services in Bangalore. Cab Services for Inter City, Airport transfer Local AC or Non A/c Taxi Services Available 24x7 Call U Taxi Services in Bengaluru.";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Bangalore Taxi Form  Banaswadi to Airport round trip Rs 1220/- All included Up to 4 passenger travel";
            ViewBag.Description = "Bengaluru Taxi services provide 24x7 from U taxi cab support for Airport cab Services inter City outstation Car Rental, Cab Hire, Innova crystal Airport Drop Rs 1420/- Ac Booking, U Taxi Hire contact No 080 414 66 888";

            return View();
        }
    }
}