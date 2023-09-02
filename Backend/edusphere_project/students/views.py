from django.shortcuts import render
from django.contrib.auth import get_user_model
Student = get_user_model()
from .serializers import UserSignupSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
import jwt
from rest_framework import generics
from .models import Student
from enrollments.models import  Enrollment
from enrollments.serializers import EnrollmentSerializer
from courses.models import Course
from assignments.models import Assignment
from submissions.models import Submission
from courses.serializers import CourseSerializer
from assignments.serializers import AssignmentSerializer
from submissions.serializers import SubmissionSerializer





# Signup View
@api_view(['POST'])
def signup(request):
    data = request.data
    print(Student)
    serializer = UserSignupSerializer(data=data)
    if serializer.is_valid():
        if not Student.objects.filter(username=data['email']).exists():
            print(make_password(data['password']),data['password'])
            student = Student.objects.create(name=data['name'], username=data['username'], email=data['email'], student_id=data['student_id'], gender=data['gender'],date_of_birth=data['date_of_birth'], major=data['major'], contact_number=data['contact_number'], password=make_password(data['password']))
            student.save()
            return Response({'message':'User Created Successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message':'User Already Exists'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# Login View
@api_view(['POST'])
def login(request):
    data = request.data
    # print(data)
    if Student.objects.filter(username=data['username']).exists():
        student = Student.objects.get(username=data['username'])
        # print(student)
        if check_password(data['password'],student.password):
            refresh = RefreshToken.for_user(student)
            return Response({'msg':"Login Success",'refresh': str(refresh),'access': str(refresh.access_token),}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message':'User Does Not Exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    
#GET Profile view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_profile(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        print(student)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(student)
    print(serializer.data)
    return Response(serializer.data)


#Get courses view
class CourseListAPIView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    

class EnrollmentCreateAPIView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        student = self.request.user
        course_id = self.request.data.get('course_id')  # Assuming you pass 'course_id' in the request data
        course = Course.objects.get(id=course_id)
        serializer.save(student=student, course=course)

class EnrolledCoursesListAPIView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the logged-in student
        student = self.request.user

        # Retrieve all enrollments for the logged-in student
        enrollments = Enrollment.objects.filter(student=student)

        # Extract the courses from the enrollments
        enrolled_courses = [enrollment.course for enrollment in enrollments]

        return enrolled_courses
        
class AssignmentListAPIView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        student = self.request.user.student
        course_id = self.kwargs['course_id']
        return Assignment.objects.filter(course_id=course_id)
    
class SubmissionCreateAPIView(generics.CreateAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        student = self.request.user.student
        serializer.save(student=student)
        
class StudentSubmissionsListAPIView(generics.ListAPIView):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        student = self.request.user
        course_id = self.kwargs['course_id']
        return Submission.objects.filter(student=student, assignment__course_id=course_id)                            








