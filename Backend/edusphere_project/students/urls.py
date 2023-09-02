from django.urls import path, include
# from . import views
from .views import (
    signup,
    login,
    get_student_profile,
    CourseListAPIView,
    EnrollmentCreateAPIView,
    EnrolledCoursesListAPIView,
    AssignmentListAPIView,
    SubmissionCreateAPIView,
    StudentSubmissionsListAPIView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('student/<int:student_id>/',get_student_profile, name='get-student-profile'),
    path('courses/', CourseListAPIView.as_view(), name='course-list'),
    path('enroll/', EnrollmentCreateAPIView.as_view(), name='enroll-course'),
    path('enrolled-courses/', EnrolledCoursesListAPIView.as_view(), name='enrolled-courses'),
    path('assignments/<int:course_id>/', AssignmentListAPIView.as_view(), name='assignment-list'),
    path('submit-assignment/', SubmissionCreateAPIView.as_view(), name='submit-assignment'),
    path('submissions/<int:course_id>/', StudentSubmissionsListAPIView.as_view(), name='student-submissions'),
]
