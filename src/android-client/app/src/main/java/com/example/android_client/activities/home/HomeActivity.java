package com.example.android_client.activities.home;

import android.content.SharedPreferences;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import com.example.android_client.R;
import com.example.android_client.databinding.ActivityHomeBinding;
import com.example.android_client.entities.UserManager;
import com.example.android_client.models.User;
import com.google.android.material.navigation.NavigationView;

public class HomeActivity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private ActivityHomeBinding binding;

    // SharedPreferences constants
    private static final String SHARED_PREFS = "app_prefs";
    private static final String KEY_IS_DARK_MODE = "is_dark_mode";

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        // 1. Load preference for Dark/Light Mode
        SharedPreferences sp = getSharedPreferences(SHARED_PREFS, MODE_PRIVATE);
        boolean isDarkMode = sp.getBoolean(KEY_IS_DARK_MODE, false);

        // 2. Apply the theme mode before setContentView
        if (isDarkMode) {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
        } else {
            AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
        }

        super.onCreate(savedInstanceState);

        // 3. Inflate layout using View Binding
        binding = ActivityHomeBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // 4. Set up toolbar & navigation drawer
        setSupportActionBar(binding.appBar.toolbar);
        DrawerLayout drawer = binding.drawerLayout;
        NavigationView navigationView = binding.navView;

        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_home,
                R.id.nav_search,
                R.id.nav_movie_admin,
                R.id.nav_category_admin
        )
                .setOpenableLayout(drawer)
                .build();

        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_admin);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);

        // 5. Handle the toggle item in the navigation drawer
        navigationView.getMenu().findItem(R.id.nav_light_dark_mode).setOnMenuItemClickListener(item -> {
            // Toggle the mode
            boolean currentlyDark = sp.getBoolean(KEY_IS_DARK_MODE, false);
            SharedPreferences.Editor editor = sp.edit();

            if (currentlyDark) {
                // Switch to Light Mode
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
                editor.putBoolean(KEY_IS_DARK_MODE, false);
            } else {
                // Switch to Dark Mode
                AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES);
                editor.putBoolean(KEY_IS_DARK_MODE, true);
            }
            editor.apply();

            // Recreate activity to apply changes
            recreate();
            return true;
        });

        UserManager userManager = UserManager.getInstance();
        User user = userManager.getUser();
        if (user == null || !user.getRole().equals("admin")) {
            navigationView.getMenu().findItem(R.id.nav_movie_admin).setVisible(false);
            navigationView.getMenu().findItem(R.id.nav_category_admin).setVisible(false);
        }
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_admin);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }
}