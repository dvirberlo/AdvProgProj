package com.example.android_client.activities.home;

import android.os.Bundle;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.example.android_client.R;

import com.example.android_client.databinding.FragmentCategoryAdminBinding;
import com.example.android_client.models.Category;
import com.example.android_client.viewmodels.CategoryViewModel;


public class CategoryAdminFragment extends Fragment {
    private FragmentCategoryAdminBinding binding;
    private CategoryViewModel categoryViewModel;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentCategoryAdminBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        categoryViewModel = new ViewModelProvider(this).get(CategoryViewModel.class);

        categoryViewModel.getCategoryData().observe(getViewLifecycleOwner(), category -> {
            if (category != null) {
                binding.id.setText("");
                binding.name.setText("");
                binding.promoted.setChecked(false);
                Toast.makeText(getContext(), category.getMessage(), Toast.LENGTH_LONG).show();
            }
        });

        binding.submitCategoryButton.setOnClickListener(v -> {
            if (binding.id.getText().toString().isEmpty())
                this.createCategory();
            else this.updateCategory();
        });

        binding.deleteCategoryButton.setOnClickListener(v -> this.deleteCategory());

        return root;
    }

    private Category getValidatedCategory() {
        String name = binding.name.getText().toString();
        if (name.isEmpty()) {
            binding.name.setError(getString(R.string.required));
            return null;
        }
        boolean promoted = binding.promoted.isChecked();
        return new Category(name, promoted);
    }

    private void createCategory() {
        Category category = getValidatedCategory();
        if (category == null) return;
        categoryViewModel.createCategory(category);
    }
    private void updateCategory() {
        Category category = getValidatedCategory();
        String id = binding.id.getText().toString();
        if (category == null) return;
        categoryViewModel.updateCategory(id, category);
    }
    private void deleteCategory() {
        String id = binding.id.getText().toString();
        if (id.isEmpty()) {
            binding.id.setError(getString(R.string.required));
            return;
        }
        categoryViewModel.deleteCategory(id);
    }


}