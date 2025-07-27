package com.ping.api

import com.ping.models.AuthResponse
import com.ping.models.User
import retrofit2.Call
import com.ping.models.Profile
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {
    @POST("api/auth/signup")
    fun signup(@Body user: User): Call<AuthResponse>

    @POST("api/auth/login")
    fun login(@Body user: User): Call<AuthResponse>

    @GET("api/profile/{userId}")
    fun getProfile(@Header("Authorization") token: String, @Path("userId") userId: Int): Call<Profile>

    @GET("api/timeline")
    fun getTimeline(@Header("Authorization") token: String): Call<List<Snap>>
}
