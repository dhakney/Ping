package com.ping.ui.screens

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.*
import androidx.navigation.NavController
import com.ping.api.RetrofitClient
import com.ping.models.Snap
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Composable
fun TimelineScreen(navController: NavController) {
    var snaps by remember { mutableStateOf<List<Snap>>(emptyList()) }

    LaunchedEffect(Unit) {
        val token = "" // Get the token from shared preferences
        val call = RetrofitClient.instance.getTimeline("Bearer $token")
        call.enqueue(object : Callback<List<Snap>> {
            override fun onResponse(call: Call<List<Snap>>, response: Response<List<Snap>>) {
                if (response.isSuccessful) {
                    snaps = response.body()!!
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<List<Snap>>, t: Throwable) {
                // Handle failure
            }
        })
    }

    LazyColumn {
        items(snaps) { snap ->
            // Display snap
        }
    }
}
