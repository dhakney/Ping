package com.ping.models

data class Profile(
    val user: User,
    val snaps: List<Snap>
)
