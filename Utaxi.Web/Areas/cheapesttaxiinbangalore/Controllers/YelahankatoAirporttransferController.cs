using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class YelahankatoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/YelahankatoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Book Taxi from Airport To Yelahanka Rs 474/- No Toll Charge";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to Yelahanka Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "Yelahanka To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "Airport to City Drop upto 45Km from 3am to 3pm at just Rs.699/- Book Online Utaxi Cab T&C apply. Airport Taxi Bengaluru, Airport Cabs Bengaluru, Airport Taxi.";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "Yelahanka to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "Airport Taxi Bengaluru Drop or Pickup fixed fare no hidden charges safe reliable and affordable price. Airport Taxi Bengaluru, Outstation Cabs Bengaluru.";

            return View();
        }
    }
}