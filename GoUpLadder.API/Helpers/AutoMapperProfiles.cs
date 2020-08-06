using System.Linq;
using AutoMapper;
using GoUpLadder.API.Dtos;
using GoUpLadder.API.Models;

namespace GoUpLadder.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<User, UserForListDto>()
                        .ForMember(dest => dest.Age, opt =>
                            opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();
            // CreateMap<UserMeasuresForDetailedDto, UserMeasure>();
            CreateMap<UserMeasure, UserMeasuresForDetailedDto>();
            CreateMap<UserMeasureForCreationDto, UserMeasure>().ReverseMap();
        }

    }
}