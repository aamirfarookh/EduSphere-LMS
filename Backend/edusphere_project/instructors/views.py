from django.shortcuts import render
from .serializers import InstructorSignupSerializer,InstructorSerializer
from .models import Instructor
from departments.models import Department
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from courses.serializers import CourseSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from instructors.authentications import InstructorJWTAuthentication

# Create your views here.

# Signup View
@api_view(['POST'])
def signup(request):
    data = request.data
    
    # department = Department.objects.get(id=department_id)
    # print("Hello",department)
    try:
        department_id = data.get('department')
        department = Department.objects.get(id=department_id)
    except Department.DoesNotExist:
        return Response({'message': 'Invalid department ID'}, status=status.HTTP_400_BAD_REQUEST)

    print(Instructor)
    serializer = InstructorSignupSerializer(data=data)
    if serializer.is_valid():
        if not Instructor.objects.filter(email=data['email']).exists():
            print(make_password(data['password']),data['password'])
            instructor = Instructor.objects.create(name=data['name'], email=data['email'], gender=data['gender'],department=department,date_of_birth=data['date_of_birth'], contact_number=data['contact_number'], password=make_password(data['password']))
            instructor.save()
            return Response({'message':'Instructor registration successful'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'Instructor Already Exists. Please Login!'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    data = request.data
    # print(data)
    if Instructor.objects.filter(email=data['email']).exists():
        instructor = Instructor.objects.get(email=data['email'])
        print(instructor)
        if check_password(data['password'],instructor.password):
            refresh = RefreshToken.for_user(instructor)
            return Response({'msg':"Login Success",'refresh': str(refresh),'access': str(refresh.access_token),}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message':'User Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)

class CourseCreateAPIView(generics.CreateAPIView):
    serializer_class = CourseSerializer
    authentication_classes = (InstructorJWTAuthentication)
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        instructor = self.request.user
        department_id = self.request.user.department_id
        department = department = Department.objects.get(id=department_id)
        data = self.request.data # Assuming you pass 'course_id' in the request data
        course = Course.objects.get(id=course_id)
        serializer.save(instructor=instructor,department=department)
