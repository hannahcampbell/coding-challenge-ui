using SchedulicityChat;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var  origins = "_CorsAnyOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: origins, builder =>
    {
        // warning: this allows wide open access to the api
        builder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed(_ => true)
            .AllowCredentials();
    });
});

// Add services to the container
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<SchedulicityChatContext>(options => options
    .UseNpgsql(builder.Configuration.GetConnectionString("SchedulicityChatContext"))
    .UseSnakeCaseNamingConvention()
    .UseLoggerFactory(LoggerFactory.Create(builder => builder.AddConsole()))
    .EnableSensitiveDataLogging()
);

// warning: this should only be done when in development env
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddRouting(options => options.LowercaseUrls = true);

var app = builder.Build();

// warning: it is not ideal to run migrations here, added  for simplicity in overall startup
var dbContext = app.Services.GetService<SchedulicityChatContext>();
var migrations = (await dbContext.Database.GetPendingMigrationsAsync()).Any();
if(migrations) {
    dbContext.Database.Migrate();
}

// warning: should probably only configure swagger in development builds
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(origins);

// app.UseHttpsRedirection();  removing for the sample app
// app.UseAuthorization();     removing for the sample app

app.MapControllers();

app.Run();
