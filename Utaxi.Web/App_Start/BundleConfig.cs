using System.Web;
using System.Web.Optimization;

namespace Utaxi.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/popper").Include(
                      "~/Scripts/popper.js"));

            bundles.Add(new StyleBundle("~/Content/jBox").Include(
                      "~/Content/jBox.css"));

            bundles.Add(new ScriptBundle("~/bundles/jBox").Include(
                      "~/Scripts/jBox.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/Common/Common.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/index").Include(
                        "~/Scripts/Home/index.js"));

            bundles.Add(new ScriptBundle("~/bundles/outstation").Include(
                        "~/Scripts/Home/outstation.js"));

            bundles.Add(new ScriptBundle("~/bundles/AirportTransfer").Include(
                        "~/Scripts/Home/AirportTransfer.js"));

            bundles.Add(new ScriptBundle("~/bundles/AirportTransferPackage").Include(
                        "~/Scripts/Home/AirportTransferPackages.js"));

            bundles.Add(new ScriptBundle("~/bundles/OutstationPackage").Include(
                        "~/Scripts/Home/OustationPackage.js"));

            bundles.Add(new ScriptBundle("~/bundles/mdtimepicker").Include(
                      "~/Scripts/mdtimepicker.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootbox").Include(
                      "~/Scripts/bootbox.js"));

            bundles.Add(new StyleBundle("~/Content/mdtimepicker").Include(
                      "~/Content/mdtimepicker.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryUI").Include(
                      "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/jqueryUI").Include(
                      "~/Content/jquery-ui.css"));

            bundles.Add(new StyleBundle("~/Content/fontawesome").Include(
                      "~/Content/font-awesome.css"));
        }
    }
}
