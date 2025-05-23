"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

function CheckoutForm() {
  const formSchema = z.object({
    "text-0": z.string(),
    "email-input-0": z.string(),
    "text-1": z.string(),
    "select-2": z.string(),
    "text-input-0": z.string(),
    "text-input-1": z.string(),
    "textarea-0": z.string(),
    "select-0": z.string(),
    "select-1": z.string(),
    "tel-input-0": z.string(),
    "text-3": z.string(),
    "text-4": z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "text-0": "",
      "email-input-0": "",
      "text-1": "",
      "select-2": "",
      "text-input-0": "",
      "text-input-1": "",
      "textarea-0": "",
      "select-0": "",
      "select-1": "",
      "tel-input-0": "",
      "text-3": "",
      "text-4": "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-8 @container"
      >
        <div className="grid grid-cols-12 gap-4">
          <div
            key="text-0"
            id="text-0"
            className=" col-span-12 @3xl:col-span-12 col-start-auto"
          >
            <p className="not-first:mt-6">Contact Information</p>
          </div>

          <FormField
            control={form.control}
            name="email-input-0"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Email</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="email-input-0"
                        placeholder=""
                        type="email"
                        id="email-input-0"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div
            key="text-1"
            id="text-1"
            className=" col-span-12 @3xl:col-span-12 col-start-auto"
          >
            <p className="not-first:mt-6">Shipping Information</p>
          </div>

          <FormField
            control={form.control}
            name="select-2"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Countary</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-2"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="option1" value="option1">
                          Option 1
                        </SelectItem>

                        <SelectItem key="option2" value="option2">
                          Option 2
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text-input-0"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">First Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder=""
                        type="text"
                        id="text-input-0"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="text-input-1"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Last Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-1"
                        placeholder=""
                        type="text"
                        id="text-input-1"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="textarea-0"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Address</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Textarea
                      key="textarea-0"
                      id="textarea-0"
                      placeholder=""
                      className=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="select-0"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">City</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-0"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="option1" value="option1">
                          Option 1
                        </SelectItem>

                        <SelectItem key="option2" value="option2">
                          Option 2
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="select-1"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Postal Code</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-1"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="option1" value="option1">
                          Option 1
                        </SelectItem>

                        <SelectItem key="option2" value="option2">
                          Option 2
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel-input-0"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Phone</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="tel-input-0"
                        placeholder=""
                        type="tel"
                        id="tel-input-0"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div
            key="text-3"
            id="text-3"
            className=" col-span-12 @3xl:col-span-12 col-start-auto"
          >
            <p className="not-first:mt-6">Payment Method</p>
          </div>

          {/* <FormField
            control={form.control}
            name="payment-method"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto @3xl:block flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">COD</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <FormLabel
                      key="checkbox-0"
                      className="border-0 p-0 @3xl:rounded-md @3xl:border @3xl:p-4 @3xl:space-x-2 w-full flex items-start has-[[data-state=checked]]:border-primary"
                      htmlFor="payment-method"
                    >
                      <Checkbox
                        id="payment-method"
                        className=""
                        {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel>COD</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Cash On Delivery
                        </p>
                      </div>
                    </FormLabel>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          /> */}

          <div
            key="text-4"
            id="text-4"
            className=" col-span-12 @3xl:col-span-12 col-start-auto"
          >
            <p className="not-first:mt-6">Shipping Address</p>
          </div>

          {/* <FormField
            control={form.control}
            name="checkbox-1"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">
                  Same as Shipping Address
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <FormLabel
                      key="checkbox-1"
                      className="border-0 p-0 @3xl:rounded-md @3xl:border @3xl:p-4 @3xl:space-x-2 w-full flex items-start has-[[data-state=checked]]:border-primary"
                      htmlFor="checkbox-1"
                    >
                      <Checkbox
                        id="checkbox-1"
                        className=""
                        {...field}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel>Same as Shipping Address</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Checkbox Description
                        </p>
                      </div>
                    </FormLabel>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          /> */}

          {/* <div className="w-full">
            <Button
              key="submit-button-0"
              className="w-full"
              type="submit"
              variant="default"
            >
              Place Order
            </Button>
          </div> */}
        </div>
      </form>
    </Form>
  );
}

export default CheckoutForm;
