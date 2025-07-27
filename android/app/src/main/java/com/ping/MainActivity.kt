package com.ping

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.ping.ui.screens.LoginScreen
import com.ping.ui.screens.ProfileScreen
import com.ping.ui.screens.SignupScreen
import com.ping.ui.screens.TimelineScreen
import com.ping.ui.theme.PingTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PingTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    val navController = rememberNavController()
                    NavHost(navController = navController, startDestination = "signup") {
                        composable("signup") { SignupScreen(navController) }
                        composable("login") { LoginScreen(navController) }
                        composable(
                            "profile/{userId}",
                            arguments = listOf(navArgument("userId") { type = NavType.IntType })
                        ) { backStackEntry ->
                            ProfileScreen(navController, backStackEntry.arguments!!.getInt("userId"))
                        }
                        composable("timeline") { TimelineScreen(navController) }
                    }
                }
            }
        }
    }
}
