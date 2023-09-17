using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Controllers
{
    public class bestpriceController : Controller
    {
        // GET: bestprice
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Sample()
        {
            return View();
        }
        public ActionResult cheapestoutstationcabservice()
        {
            ViewBag.Title = "Outstation Cabs in Bengaluru Cab Hatchback @ Rs.8/-Per Km";
            ViewBag.Description = "Car Rental for outstation, Outstation taxi services available 24/7, Book Sedan Cab @ Rs.9.00/- Per Km, Book Outstation taxi SUV @ 12.50/- Per Km, 1 week trip book Tempo Traveler 14.00/- Per Km, Mini Bus for rental @ 22.00/- Per Km";
            ViewBag.Keywords = "one way outstation cab in bangalore, Outsation Cab booking, Outstation Cabs at Lowest Fare, Outsatation taxi in bangalore, Taxi services in Bangalore for Local or Outstation rides, outstation cabs tariff, outstation taxi from bangalore airport";
            return Redirect("/bangalore/outstation-taxi/bangalore-outstation-cabs.aspx");
        }
    }
}