using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using GoUpLadder.API.Models;
using Microsoft.Extensions.Logging;

namespace GoUpLadder.API.Data
{
    public class DataContextSeed
    {
        public static async Task SeedAsync(DataContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

                if (!context.MeasureType.Any())
                {
                    var measuretypeData =
                    File.ReadAllText("Data/SeedData/measuretypes.json");

                    var measuretypes = JsonSerializer.Deserialize<List<MeasureType>>(measuretypeData);

                    foreach (var item in measuretypes)
                    {
                        context.MeasureType.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

                if (!context.Measure.Any())
                {
                    var measuresData =
                    File.ReadAllText("Data/SeedData/measures.json");

                    var measures = JsonSerializer.Deserialize<List<Measure>>(measuresData);

                    foreach (var item in measures)
                    {
                        context.Measure.Add(item);
                    }

                    await context.SaveChangesAsync();
                }

            
            }
            catch (Exception ex)
            {

                var logger = loggerFactory.CreateLogger<DataContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}