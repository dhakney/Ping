package com.ping.models

data class Snap(
    val id: Int,
    val user_id: Int,
    val latitude: Double,
    val longitude: Double,
    val image_url: String,
    val caption: String,
    val created_at: String
)
