using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Utaxi.Web.Controllers
{
    public class OffersController : Controller
    {
        //
        // GET: /Offers/
        public ActionResult Index()
        {
            ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest Out Station rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";
           
            return View();
        }

        public ActionResult OfferDetails()
        {
            ViewBag.Title = "Airport Taxi | Cabs in Bangalore | Rs 474 Pickup | Rs 674 Drop";
            ViewBag.Description = "Airport Taxi in Bangalore - Rs 474 / -Pick - Up, Rs 674 / -Drop, Cheapest Out Station rates.Indica Rs.7 / -Logan / Etios / Dzire Rs.9";
            return View();
        }
	}
}