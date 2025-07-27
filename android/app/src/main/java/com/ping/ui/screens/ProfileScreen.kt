package com.ping.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.navigation.NavController
import com.ping.api.RetrofitClient
import com.ping.models.Profile
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Composable
fun ProfileScreen(navController: NavController, userId: Int) {
    var profile by remember { mutableStateOf<Profile?>(null) }

    LaunchedEffect(userId) {
        val token = "" // Get the token from shared preferences
        val call = RetrofitClient.instance.getProfile("Bearer $token", userId)
        call.enqueue(object : Callback<Profile> {
            override fun onResponse(call: Call<Profile>, response: Response<Profile>) {
                if (response.isSuccessful) {
                    profile = response.body()
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<Profile>, t: Throwable) {
                // Handle failure
            }
        })
    }

    if (profile == null) {
        // Show loading indicator
    } else {
        Column(modifier = Modifier.fillMaxSize()) {
            Text(text = profile!!.user.username)
            Text(text = profile!!.user.email)
            LazyColumn {
                items(profile!!.snaps) { snap ->
                    // Display snap
                }
            }
        }
    }
}
