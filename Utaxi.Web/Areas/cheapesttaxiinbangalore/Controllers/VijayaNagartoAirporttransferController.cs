using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Areas.cheapesttaxiinbangalore.Controllers
{
    public class VijayaNagartoAirporttransferController : Controller
    {
        // GET: cheapesttaxiinbangalore/VijayaNagartoAirporttransfer
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult AirportPickup()
        {
            ViewBag.Title = "Airport To VijayaNagar we Offer Rs 474/- up to 4 Passengers";
            ViewBag.Description = "Book taxi in Bengaluru, We provide lowest price cab services for Local, Outstation, Local Package, Holiday package from U taxi. Get multiple car options with Hatchback, Sedan, SUV, Innova crystal Bengaluru airport pickup to VijayaNagar Drop Rs 474/-.";

            return View();
        }
        public ActionResult AirportDrop()
        {
            ViewBag.Title = "VijayaNagar To Airport | Airport Drop 674/- | No Toll Charge";
            ViewBag.Description = "Airport Taxi Bengaluru Drop or Pickup fixed fare no hidden charges safe reliable and affordable price. Airport Taxi Bengaluru, Outstation Cabs Bengaluru.";

            return View();
        }
        public ActionResult AirportRoundTrip()
        {
            ViewBag.Title = "VijayaNagar to Airport round trip | just Rs 1220/- Including Hour Waiting | No Toll Charge Parking Charge ";
            ViewBag.Description = "Hire a airport taxi Bengaluru. Book airport cabs Bengaluru. Airport drop & airport pickup Bengaluru Flexible Tariffs Insurance & Taxes Included Widest range of ";

            return View();
        }
    }
}